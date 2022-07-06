require 'rails_helper'

RSpec.describe "RequestsUsers", type: :request do
  let!(:user) {create(:user)}
  let!(:request) { create(:request, user_id: user.id)}
  let!(:request_user) { create(:requests_user, user_id: user.id, request_id:request.id)}
  let!(:requests_user_id) {request_user.id}
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: {sub:user.id}).token
    { 'Authorization': "Bearer #{token}"}
  end
  describe "GET /index" do
    before { get "/requests_users", params: {}, headers: authenticated_header(user) }
    
    it "returns requests_users" do
      expect(json).not_to be_empty
      expect(json.size).to eq(1)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /requests_users/:id" do
    before {get "/requests_users/#{requests_user_id}", params: {}, headers: authenticated_header(user) }

    context "when record exists" do
      it "return the message" do
        expect(json).not_to be_empty
        expect(json['id']).to eq(requests_user_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "POST /requests_users" do
    context "message is valid" do
      before {post "/requests_users", params: {requests_user: {request_id:request.id,user_id:user.id,fulfilled: true  }}, headers: authenticated_header(user) }

      it "create requests_users" do
        expect(json).not_to be_empty
        expect(json.size).to eq(6)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end
  end

  describe "PUT /requests_users" do
    context "when the record exists" do
      before {get "/requests_users/#{requests_user_id}", params: {requests_user: {fulfilled: false}}, headers: authenticated_header(user) }

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /requests_users/:id' do
    before {delete "/requests_users/#{requests_user_id}", params: {}, headers: authenticated_header(user) }

    it "return status code 204" do
      expect(response).to have_http_status(204)
    end
  end


end
