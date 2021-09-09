#!/bin/bash

cd /opt/sdcoe-transcript/security || exit

echo "Create keys that can be used for signing transcripts"

# Reference
# https://www.scottbrady91.com/OpenSSL/Creating-RSA-Keys-using-OpenSSL
mkdir -p /opt/sdcoe/rsa
openssl genrsa -out /opt/sdcoe/rsa/sdcoe-private.pem 4096
openssl rsa -in /opt/sdcoe/rsa/sdcoe-private.pem -pubout -out /opt/sdcoe/rsa/sdcoe-public.pem
chmod -R 600 /opt/sdcoe/rsa
chmod +x /opt/sdcoe/rsa

SDCOE_SIGNER_KEY_FILE=/opt/sdcoe/rsa/sdcoe-private.pem
SDCOE_VERIFIER_KEY_FILE=/opt/sdcoe/rsa/sdcoe-public.pem
SDCOE_KEY_FOLDER=/opt/sdcoe/rsa
SDCOE_VERIFIER_PUBLIC_KEY_BASE_64=$(openssl base64 -A < "$SDCOE_VERIFIER_KEY_FILE")

rm -f /etc/profile.d/sdcoe-signer.sh || true
echo "export SDCOE_SIGNER_KEY_FILE='$SDCOE_SIGNER_KEY_FILE'" >> /etc/profile.d/sdcoe-signer.sh
echo "export SDCOE_VERIFIER_KEY_FILE='$SDCOE_VERIFIER_KEY_FILE'" >> /etc/profile.d/sdcoe-signer.sh
echo "export SDCOE_KEY_FOLDER='$SDCOE_KEY_FOLDER'" >> /etc/profile.d/sdcoe-signer.sh
echo "export SDCOE_VERIFIER_PUBLIC_KEY_BASE_64='$SDCOE_VERIFIER_PUBLIC_KEY_BASE_64'" >> /etc/profile.d/sdcoe-signer.sh



echo "Create keys - completed"

