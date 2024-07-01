import bcrypt

def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# comprar si una contraseña es igual a la otra
def verify_password(password: str, hashed_password: str):
    # comprar la contraseña
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))