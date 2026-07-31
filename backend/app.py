from flask import Flask
from config.db import db, jwt, cors, mail
from config.config import Config
from flask_migrate import Migrate
from models.CategoryModel import CategoryModel
from models.PermissionModel import PermissionModel
from models.ProductModel import ProductModel
from models.RoleModel import RoleModel
from models.RolePermissionModel import RolePermissionModel
from models.RoleUserModel import RoleUserModel
from models.UserModel import UserModel
from models.EmailOTPModel import EmailOTPModel
from features.auth.routes import auth_bp
from features.category.routes import category_bp
from features.product.routes import product_bp
from features.role.routes import role_bp
from features.rolepermission.routes import rolepermission_bp
from features.user.routes import user_bp
from features.userrole.routes import userrole_bp
from features.page.routes import page_bp
from features.log.routes import log_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
jwt.init_app(app)
cors.init_app(app)
mail.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(category_bp)
app.register_blueprint(product_bp)
app.register_blueprint(role_bp)
app.register_blueprint(rolepermission_bp)
app.register_blueprint(user_bp)
app.register_blueprint(userrole_bp)
app.register_blueprint(page_bp)
app.register_blueprint(log_bp)

migrate = Migrate(app, db)

print(app.config["MAIL_SERVER"])
print(app.config["MAIL_PORT"])
print(app.config["MAIL_USERNAME"])
print(app.config["MAIL_DEFAULT_SENDER"])

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)