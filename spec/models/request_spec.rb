require 'rails_helper'

RSpec.describe Request, type: :model do
  subject { described_class.new(title:'Housing', description: 'I need help to buy a new house', lat: 1.8, lng: 1.7, request_type: "material_need", fulfilled: false) }
  it { should validate_presence_of(:title) }
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end

  it "is not valid without an lat" do
    subject.lat = nil
    expect(subject).to_not be_valid
  end
  
  it "is not valid without an lng" do
    subject.lng = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an title" do
    subject.title = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an request_type" do
    subject.request_type = nil
    expect(subject).to_not be_valid
  end
  
end
