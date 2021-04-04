require 'rails_helper'

RSpec.describe User, type: :model do
  subject { described_class.new(last_name: 'last', first_name: 'first', password: "some_password", email: "someone@code.com") }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end

  it "is not valid without a password" do
    subject.password = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an email" do
    subject.email = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without an first_name" do
    subject.first_name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an last_name" do
    subject.last_name = nil
    expect(subject).to_not be_valid
  end
end
