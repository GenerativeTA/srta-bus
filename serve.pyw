"""
SRTA Bus iPhone Server
Serves the iPhone PWA on port 8090 for access via Tailscale.
Runs silently in the background (no console window with .pyw extension).

Access from iPhone: http://100.98.146.83:8090  (this PC's Tailscale IP)
"""
import http.server
import socketserver
import os

PORT = 8090
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

os.chdir(DIRECTORY)

handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("0.0.0.0", PORT), handler) as httpd:
    httpd.serve_forever()
