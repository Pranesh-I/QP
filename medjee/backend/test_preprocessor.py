from app.services.pdf_extractor import PDFExtractor
from app.services.preprocessor import Preprocessor

pdf_path = "storage/uploads/12014077-d8c3-4326-b5b6-a95097f885ae_XII_DT-1_JEE_QP.pdf"

extractor = PDFExtractor()
full_text = extractor.extract_full_text(pdf_path)

preprocessor = Preprocessor()
questions = preprocessor.preprocess(full_text)

print("Total questions found:", len(questions))
print("=" * 100)

for q in questions:
    print(f"Q{q['q_number']:02d} [{q['subject']}]")
    print("Stem:")
    print(q["stem_text"])
    print("Options:", len(q["options"]))

    for opt in q["options"]:
        print(f"  {opt['label']}) {opt['text_plain']}")

    print("-" * 100)