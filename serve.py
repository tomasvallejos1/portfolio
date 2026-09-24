"""Servidor local para desarrollo.

Igual que `python -m http.server`, pero le pide al navegador que no guarde
nada en caché. Sin esto, después de editar content.js el navegador puede
seguir mostrando la versión anterior hasta que se fuerce la recarga.

Uso:  python serve.py [puerto]     (por defecto 4173)
"""

import http.server
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    server = http.server.ThreadingHTTPServer(("", port), NoCacheHandler)
    print(f"Portfolio en http://localhost:{port}  (Ctrl+C para cortar)", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
