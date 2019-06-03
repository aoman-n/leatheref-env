require 'rails_helper'

RSpec.describe "Users API", type: :request do
  describe "ユーザーの作成" do

    before do
      @headers = { "Content-Type": "application/json" }
    end

    context "パラメータが有効な時" do
      it "mailerが正しく機能すること" do
        # user_params = ({
        #   name: 'example',
        #   email: 'example@example.com',
        #   password: 'password',
        #   password_confirmation: 'password'
        # }).to_json
        # post users_path, params: user_params, headers: @headers

        post users_path, params: {
          name: 'example',
          email: 'example@example.com',
          password: 'password',
          password_confirmation: 'password'
        }
        # json = JSON.parse(response.body)
        # expect(response).to have_http_status(:success)
      end
    end

    context "無効なパラメータの時" do
      it "statusが401であり、エラーの内容が返ってくること" do

      end
    end

  end
end
