class UsersController < ApplicationController
  before_action :logged_in_user, only: [:me]

  def create
    puts 'きてます'
    p params
    @user = User.new(user_params)
    if @user.save
      puts 'tset1'
      @user.send_activation_email
      puts 'きてます2'
      render json: { message: '確認メールを送信しました。' }
    else
      render json: { errors: @user.errors.full_messages }, status: 401
    end
  end

  def me
    render json: current_user
  end

  private

    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end

end
