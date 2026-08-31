#!/usr/bin/env python3
"""Test connectivity to an HTTP API endpoint.

Sends a request to the given URL and reports the HTTP status, response
time, content type, and (if applicable) a preview of the JSON body.

Uses only the Python standard library, so no extra packages are required.

Examples:
    python test_api_connection.py https://api.example.com/health
    python test_api_connection.py http://localhost:5173 --expect-status 200
    python test_api_connection.py https://api.example.com/items \\
        --method POST --header "Authorization: Bearer TOKEN" \\
        --data '{"name": "test"}' --timeout 5

Exit codes:
    0  success (endpoint reachable and status matched expectation)
    1  unexpected HTTP status code
    2  connection / network error
    3  invalid usage
"""

import argparse
import json
import sys
import time
import urllib.error
import urllib.request


def parse_headers(raw_headers):
    """Turn a list of 'Key: Value' strings into a dict."""
    headers = {}
    for item in raw_headers:
        if ":" not in item:
            raise ValueError(f"Invalid header (expected 'Key: Value'): {item!r}")
        key, value = item.split(":", 1)
        headers[key.strip()] = value.strip()
    return headers


def test_connection(url, method, headers, data, timeout):
    """Perform the request and return a result dict."""
    body = data.encode("utf-8") if data else None
    request = urllib.request.Request(
        url=url,
        data=body,
        headers=headers,
        method=method.upper(),
    )

    start = time.perf_counter()
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            elapsed = time.perf_counter() - start
            raw = response.read()
            return {
                "ok": True,
                "status": response.status,
                "reason": response.reason,
                "elapsed_ms": round(elapsed * 1000, 1),
                "content_type": response.headers.get("Content-Type", ""),
                "body": raw,
            }
    except urllib.error.HTTPError as exc:
        # The server responded, but with an error status code.
        elapsed = time.perf_counter() - start
        return {
            "ok": True,
            "status": exc.code,
            "reason": exc.reason,
            "elapsed_ms": round(elapsed * 1000, 1),
            "content_type": exc.headers.get("Content-Type", "") if exc.headers else "",
            "body": exc.read(),
        }
    except urllib.error.URLError as exc:
        return {"ok": False, "error": f"Connection failed: {exc.reason}"}
    except (TimeoutError, ConnectionError) as exc:
        return {"ok": False, "error": f"Connection error: {exc}"}


def preview_body(body, content_type):
    """Return a short, readable preview of the response body."""
    text = body.decode("utf-8", errors="replace")
    if "application/json" in content_type:
        try:
            parsed = json.loads(text)
            pretty = json.dumps(parsed, indent=2, ensure_ascii=False)
            return pretty if len(pretty) <= 800 else pretty[:800] + "\n... (truncated)"
        except json.JSONDecodeError:
            return "[Content-Type is JSON but body could not be parsed]\n" + text[:400]
    return text[:400] + ("... (truncated)" if len(text) > 400 else "")


def main(argv=None):
    parser = argparse.ArgumentParser(
        description="Test connectivity to an HTTP API endpoint.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("url", help="The endpoint URL to test.")
    parser.add_argument(
        "-X", "--method", default="GET", help="HTTP method (default: GET)."
    )
    parser.add_argument(
        "-H",
        "--header",
        action="append",
        default=[],
        metavar="'Key: Value'",
        help="Request header (repeatable).",
    )
    parser.add_argument(
        "-d", "--data", default=None, help="Request body to send (e.g. JSON string)."
    )
    parser.add_argument(
        "-t",
        "--timeout",
        type=float,
        default=10.0,
        help="Timeout in seconds (default: 10).",
    )
    parser.add_argument(
        "--expect-status",
        type=int,
        default=None,
        metavar="CODE",
        help="Fail if the response status is not this code.",
    )
    parser.add_argument(
        "--quiet", action="store_true", help="Only print pass/fail summary."
    )
    args = parser.parse_args(argv)

    try:
        headers = parse_headers(args.header)
    except ValueError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 3

    if args.data and "Content-Type" not in headers:
        # Assume JSON if a body is provided without an explicit content type.
        headers["Content-Type"] = "application/json"

    print(f"-> {args.method.upper()} {args.url}")
    result = test_connection(
        args.url, args.method, headers, args.data, args.timeout
    )

    if not result["ok"]:
        print(f"FAIL  {result['error']}", file=sys.stderr)
        return 2

    status = result["status"]
    ok_range = 200 <= status < 400
    print(f"     status : {status} {result['reason']}")
    print(f"     time   : {result['elapsed_ms']} ms")
    if result["content_type"]:
        print(f"     type   : {result['content_type']}")

    if not args.quiet and result["body"]:
        print("     body   :")
        preview = preview_body(result["body"], result["content_type"])
        for line in preview.splitlines():
            print(f"       {line}")

    if args.expect_status is not None:
        if status == args.expect_status:
            print(f"PASS  status matches expected {args.expect_status}")
            return 0
        print(
            f"FAIL  expected status {args.expect_status}, got {status}",
            file=sys.stderr,
        )
        return 1

    if ok_range:
        print("PASS  endpoint reachable")
        return 0
    print(f"FAIL  endpoint returned error status {status}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
