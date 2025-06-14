# merge-label-cli

A CLI tool to merge a logo and a 4×6 shipping label PDF into a 4×8 layout, perfect for printing with thermal printers like MUNBYN.

## ✨ Features

- Inserts your store's logo centered in the top 2" of a 4×8" label
- Places an existing 4×6" shipping label below
- Outputs a print-ready 4×8 PDF
- Maintains aspect ratio and applies left/right padding
- Ideal for custom-branded shipping labels

## 📦 Installation

```bash
npm install -g merge-label-cli
```

## 🛠️ Usage

```bash
merge-label --logo path/to/logo.jpg --label path/to/label.pdf --output path/to/output.pdf
```

### Options:
| Flag       | Description                             |
| ---------- | --------------------------------------- |
| `--logo`   | Path to logo image (JPG or PNG)         |
| `--label`  | Path to existing 4×6 shipping label PDF |
| `--output` | Output path for the merged 4×8 PDF      |

### 🖨️ Example

```bash
merge-label --logo acme-logo.png --label usps-label.pdf --output label-4x8.pdf
```

This creates a new `label-4x8.pdf` with the logo on top and label on the bottom.