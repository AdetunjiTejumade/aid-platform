require 'rails_helper'

RSpec.describe "Requests", type: :request do
  # @user = User.new(first_name: "Jonh", last_name: "Snow",email:"test@gmail.com",password:"password" )
  # @user.save
  let!(:requests) { create_list(:request,10)}
  let(:request_id) { requests.first.id}
  describe "GET /requests" do
    before {get '/requests'}

    it "returns requests" do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

end
