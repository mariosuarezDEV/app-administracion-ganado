# Redundancia de datos

def show_user(data) -> dict:
    return {
        'id': str(data["_id"]),
        'full_name': data["full_name"],
        'username' : data["username"],
        'email': data["email"],
    }
    
def show_users(data) -> list:
    return [show_user(item) for item in data]

def login_user(data) -> dict:
    return {
        'id': str(data["_id"]),
        'name': data["name"],
        'email': data["email"]
    }