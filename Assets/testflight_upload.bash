#!/bin/bash

set -x  # Виводить кожну команду перед її виконанням

echo "Starting post-build script..."

# Виведення інформації про середовище
echo "Current working directory:"
pwd

echo "Contents of current directory:"
ls -la

echo "Environment variables:"
env | sort

echo "Disk usage:"
df -h

# Функція для рекурсивного пошуку IPA файлів
find_ipa_files() {
    local search_dir="$1"
    echo "Searching for .ipa files in $search_dir"
    find "$search_dir" -name "*.ipa" -type f 2>/dev/null
}

# Пошук IPA файлів у різних можливих місцях
echo "Searching for IPA files in current directory:"
find_ipa_files "."

echo "Searching for IPA files in parent directory:"
find_ipa_files ".."

echo "Searching for IPA files in /tmp:"
find_ipa_files "/tmp"

echo "Searching for IPA files in home directory:"
find_ipa_files "$HOME"

# Якщо IPA файл знайдено, спробуємо завантажити його
IPA_FILES=$(find . -name "*.ipa" -type f)
if [ -n "$IPA_FILES" ]; then
    echo "Found IPA files:"
    echo "$IPA_FILES"
    
    # Використовуємо перший знайдений IPA файл
    IPA_PATH=$(echo "$IPA_FILES" | head -n 1)
    
    echo "Attempting to upload: $IPA_PATH"
    
    # Перевірка змінних середовища
    if [ -z "$ITUNES_USERNAME" ]; then
        echo "Error: ITUNES_USERNAME is not set"
        exit 1
    fi

    if [ -z "$ITUNES_PASSWORD" ]; then
        echo "Error: ITUNES_PASSWORD is not set"
        exit 1
    fi

    if xcrun altool --upload-app -t ios -f "$IPA_PATH" -u "$ITUNES_USERNAME" -p "$ITUNES_PASSWORD" --output-format xml; then
        echo "Upload to App Store Connect finished successfully"
    else
        echo "Upload to App Store Connect failed"
        echo "Debugging information:"
        echo "IPA_PATH: $IPA_PATH"
        echo "ITUNES_USERNAME: $ITUNES_USERNAME"
    fi
else
    echo "No IPA files found"
fi