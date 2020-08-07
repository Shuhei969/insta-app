class ApplicationController < ActionController::Base
  # CSRF対策で下記記述を追加
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
    end
end
