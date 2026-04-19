
from datetime import datetime
from app.database.mistake_collection import mistakes_collection
from app.database.final_result_collection import final_result_collection

def store_mistake(user_id, module, submodule, expected, actual, mistake_type):
    mistakes_collection.insert_one({
        "user_id": user_id,
        "module": module,
        "submodule": submodule,
        "expected": expected,
        "actual": actual,
        "mistake_type": mistake_type,
        "timestamp": datetime.utcnow()
    })

def get_user_mistakes(user_id, module):
    mistakes = list(mistakes_collection.find({
        "user_id": user_id,
        "module": module
    }))

    # extract expected letters
    questions = list(set([m["expected"] for m in mistakes]))

    return questions 

def evaluate_final_test(user_id, answers):

    mistakes = list(mistakes_collection.find({
        "user_id": user_id,
        "module": "alphabet"
    }))

    total = len(set([m["expected"] for m in mistakes]))
    correct = 0

    for item in answers:
        expected = item["expected"]
        actual = item["actual"]

        if expected.lower() == actual.lower():
            correct += 1

    result = {
        "user_id": user_id,
        "module": "alphabet",
        "total_mistakes": total,
        "correct_in_final": correct,
        "improved": correct,
        "remaining_errors": total - correct
    }

    # 🔥 SAVE TO DB (BUT DO NOT RETURN THIS)
    final_result_collection.update_one(
        {"user_id": user_id, "module": "alphabet"},
        {"$set": result},
        upsert=True
    )

    # ✅ RETURN CLEAN DICT ONLY
    return {
        "total_mistakes": total,
        "correct_in_final": correct,
        "improved": correct,
        "remaining_errors": total - correct
    }