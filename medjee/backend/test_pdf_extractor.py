from app.services.pdf_extractor import PDFExtractor

extractor = PDFExtractor()

pdf_path = "storage/uploads/12014077-d8c3-4326-b5b6-a95097f885ae_XII_DT-1_JEE_QP.pdf"

pages = extractor.extract_pages(pdf_path)

print("Total pages extracted:", len(pages))

for page in pages:
    print(
        f"Page {page['page_number']} "
        f"has_text={page['has_text']} "
        f"chars={len(page['text'])}"
    )