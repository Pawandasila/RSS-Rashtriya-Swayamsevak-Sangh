# idcards/utils/templates_config.py

# ID Card layout
ID_CARD_LAYOUT = {
    "text_fields": [
        {"name": "reg_no", "x": 130, "y": 740, "font": "Helvetica-Bold", "size": 11},
        {"name": "name", "x": 140, "y": 520},
        {"name": "in", "x": 140, "y": 502},
        {"name": "mob", "x": 140, "y": 484},
        {"name": "date", "x": 140, "y": 466},
        {"name": "block", "x": 140, "y": 448},
        {"name": "district", "x": 140, "y": 430},
        {"name": "state", "x": 140, "y": 412},
    ],
    "image": {"x": 240, "y": 560, "width": 100, "height": 100, "shape": "round"},
    "qr": {"x": 100, "y": 420, "width": 60, "height": 60, "data": "Sample QR"},
}

# Certificate layout
CERTIFICATE_LAYOUT = {
    "text_fields": [
        {"name": "name", "x": 300, "y": 400, "font": "Helvetica-Bold", "size": 18},
        {"name": "course", "x": 280, "y": 370, "size": 14},
        {"name": "date", "x": 280, "y": 340, "size": 12},
    ],
    "image": {"x": 450, "y": 420, "width": 80, "height": 80, "shape": "round"},
    "qr": {"x": 500, "y": 100, "width": 60, "height": 60, "data": "Sample QR"},
    "duplicate_page": False,
}
