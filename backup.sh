#!/bin/bash

# ==============================================================================
# Apex Craft Uniforms - Automated Database & Uploads Backup Script
# Usage: ./backup.sh
# ==============================================================================

BACKUP_DIR="/var/backups/apexcraft"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_NAME="uniformdb"
MONGO_URI="mongodb://127.0.0.1:27017/${DB_NAME}"
UPLOADS_DIR="/var/www/apexcraft/server/uploads"
DEST_ARCHIVE="${BACKUP_DIR}/apexcraft_backup_${TIMESTAMP}.tar.gz"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

echo "=========================================="
echo "Starting Apex Craft Backup: ${TIMESTAMP}"
echo "=========================================="

# Create temporary dump directory
TMP_DUMP_DIR=$(mktemp -d)

# 1. Run mongodump for MongoDB
echo "[1/3] Dumping MongoDB database '${DB_NAME}'..."
mongodump --uri="${MONGO_URI}" --out="${TMP_DUMP_DIR}/db" --quiet

if [ $? -ne 0 ]; then
  echo "❌ Error: mongodump failed!"
  rm -rf "$TMP_DUMP_DIR"
  exit 1
fi

# 2. Copy uploads folder into dump bundle
echo "[2/3] Copying media uploads..."
if [ -d "$UPLOADS_DIR" ]; then
  cp -r "$UPLOADS_DIR" "${TMP_DUMP_DIR}/uploads"
fi

# 3. Create compressed tar.gz archive
echo "[3/3] Creating compressed archive '${DEST_ARCHIVE}'..."
tar -czf "$DEST_ARCHIVE" -C "$TMP_DUMP_DIR" .

# Cleanup temp files
rm -rf "$TMP_DUMP_DIR"

# Delete backups older than 30 days
find "$BACKUP_DIR" -name "apexcraft_backup_*.tar.gz" -mtime +30 -delete

echo "✅ Backup Completed Successfully!"
echo "Archive File: ${DEST_ARCHIVE}"
echo "Size: $(du -sh ${DEST_ARCHIVE} | cut -f1)"
echo "=========================================="

# ------------------------------------------------------------------------------
# DAILY CRON JOB EXAMPLE (Run every night at 2:00 AM):
# Open crontab:
#   crontab -e
# Add line:
#   0 2 * * * /var/www/apexcraft/backup.sh >> /var/log/apexcraft_backup.log 2>&1
#
# RESTORE INSTRUCTIONS:
# 1. Extract archive:
#    mkdir -p /tmp/restore && tar -xzf apexcraft_backup_YYYYMMDD_HHMMSS.tar.gz -C /tmp/restore
# 2. Restore MongoDB:
#    mongorestore --db uniformdb /tmp/restore/db/uniformdb --drop
# 3. Restore Uploads:
#    cp -r /tmp/restore/uploads/* /var/www/apexcraft/server/uploads/
# 4. Cleanup:
#    rm -rf /tmp/restore
# ------------------------------------------------------------------------------
