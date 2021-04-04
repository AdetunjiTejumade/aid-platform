require 'rails_helper'

RSpec.describe Message, type: :model do
  subject { described_class.new(body: "Hey, wassup")}

  it "is not valid without a body" do
    subject.body = nil
    expect(subject).to_not be_valid
  end
end
