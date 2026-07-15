from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import webbrowser


def main():
    root = Path(__file__).resolve().parent
    os.chdir(root)

    server = ThreadingHTTPServer(("127.0.0.1", 0), SimpleHTTPRequestHandler)
    url = f"http://127.0.0.1:{server.server_port}/index.html"

    print("热力环流形成过程模拟实验", flush=True)
    print(f"项目文件夹：{root}", flush=True)
    print(f"打开地址：{url}", flush=True)
    print("演示时请保持此窗口打开。按 Ctrl+C 停止。", flush=True)
    webbrowser.open(url)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n服务已停止。")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
