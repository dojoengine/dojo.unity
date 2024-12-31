#!/bin/bash

# format.sh - Unity C# code formatter script

# Print colorful status messages
print_status() {
    echo -e "\033[1;34m$1\033[0m"
}

print_error() {
    echo -e "\033[1;31m$1\033[0m"
}

print_success() {
    echo -e "\033[1;32m$1\033[0m"
}

# Check if dotnet is installed
if ! command -v dotnet &> /dev/null; then
    print_error "Error: .NET SDK is not installed"
    print_error "Please install .NET SDK 6.0 or later from https://dotnet.microsoft.com/download"
    exit 1
fi

# Install dotnet-format if not already installed
if ! command -v dotnet format &> /dev/null; then
    print_status "Installing dotnet-format tool..."
    dotnet tool install -g dotnet-format
    
    if [ $? -ne 0 ]; then
        print_error "Failed to install dotnet-format"
        exit 1
    fi
fi

print_status "Setting up temporary solution..."

# Create temporary directory
mkdir -p _temp
cd _temp

# Create new solution
dotnet new sln -n TempSolution > /dev/null

# Create temporary project
dotnet new classlib -n TempProject > /dev/null
rm ./TempProject/Class1.cs

print_status "Copying C# files..."

# Copy all .cs files from Assets directory
find ../Assets -name "*.cs" -exec cp {} ./TempProject/ \;

# Add project to solution
dotnet sln add ./TempProject/TempProject.csproj > /dev/null

print_status "Formatting C# files..."

# Format the solution
dotnet format ./TempSolution.sln

if [ $? -eq 0 ]; then
    print_status "Copying formatted files back..."
    
    # Copy formatted files back to their original locations
    for file in ./TempProject/*.cs; do
        filename=$(basename "$file")
        # Find the original file and copy the formatted version back
        find ../Assets -name "$filename" -exec cp "$file" {} \;
    done
    
    print_success "✨ Formatting complete!"
else
    print_error "❌ Formatting failed!"
fi

# Cleanup
cd ..
rm -rf _temp

print_status "Done! 🎮"