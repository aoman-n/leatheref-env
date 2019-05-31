# == Schema Information
#
# Table name: users
#
#  id                :bigint(8)        not null, primary key
#  email             :string(255)      not null
#  name              :string(255)      not null
#  password_digest   :string(255)      not null
#  remember_digest   :string(255)
#  admin             :boolean          default(FALSE)
#  activation_digest :string(255)
#  activated         :boolean          default(FALSE)
#  activated_at      :datetime
#  reset_digest      :string(255)
#  reset_sent_at     :datetime
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

require 'rails_helper'

RSpec.describe User, type: :model do

  it "有効な名前、Emailアドレス、パスワード、パスワード確認があればUserを作成出来ること" do
    user = User.new(
      name: "Aoba",
      email: "aobatest@example.com",
      password: "password",
      password_confirmation: "password"
    )
    expect(user).to be_valid
  end

  # バリデーションチェック
  # name
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_length_of(:name).is_at_most(20) }
  # email
  it { is_expected.to validate_presence_of :email }
  it { is_expected.to validate_length_of(:email).is_at_most(250) }
  # it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  # it { is_expected.to validate_presence_of :last_name }
  # password
  it { is_expected.to have_secure_password }
  it { is_expected.to validate_length_of(:password).is_at_least(6) }

  it "emailが小文字に変換後DBに保存されること" do
    user = FactoryBot.create(:user, email: 'ExamPle@example.com')
    expect(user.reload.email).to eq "example@example.com"
  end

  it "" do
  end
end
