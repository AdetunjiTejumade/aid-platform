require 'rails_helper'

RSpec.describe "RequestsConversations", type: :request do
    let!(:user) {create(:user)}
    let!(:request) {create(:request , user_id: user.id)}
    let!(:conversation) {create(:conversation)}
    let!(:requests_conversation) {create(:requests_conversation, request_id: request.id, conversation_id: conversation.id)}
    let!(:requests_conversation_id) {requests_conversation.id}

    def authenticated_header(user)
      token = Knock::AuthToken.new(payload: {sub:user.id}).token
      { 'Authorization': "Bearer #{token}"}
    end
    describe "GET /index" do
      before { get '/requests_conversations', params: {}, headers: authenticated_header(user)}
  
      it "returns conversation" do
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
      end
  
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  
    describe "GET /requests_conversations/:id" do
      before { get "/requests_conversations/#{requests_conversation_id}", params: {}, headers: authenticated_header(user) }
  
      context "when record exists" do
        it "return the conversation" do
          expect(json).not_to be_empty
          expect(json['id']).to eq(requests_conversation_id)
        end
  
        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end
      end
    end
  
    describe "POST /requests_conversations" do
      context "conversation is valid" do
        before { post "/requests_conversations", params: {requests_conversation: {conversation_id:conversation.id, request_id:request.id}}, headers: authenticated_header(user) }
  
        it "create conversation" do
          expect(json).not_to be_empty
          expect(json.size).to eq(5)
        end
  
        it 'returns status code 201' do
          expect(response).to have_http_status(201)
        end
      end
    end
  
    describe "PUT /requests_conversations" do
      context "when the record exists" do
        before { get "/requests_conversations/#{requests_conversation_id}", params: {requests_conversation: {request_id:request.id}}, headers: authenticated_header(user) }
  
        it "returns status code 200" do
          expect(response).to have_http_status(200)
        end
      end
    end
  
  
end
