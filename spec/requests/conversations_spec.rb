require 'rails_helper'

RSpec.describe "Conversations", type: :request do
  let!(:user) {create(:user)}
  let!(:conversation) {create(:conversation)}
  let!(:conversation_id) {conversation.id}
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: {sub:user.id}).token
    { 'Authorization': "Bearer #{token}"}
  end
  describe "GET /index" do
    before {get '/conversations', params: {}, headers: authenticated_header(user)}

    it "returns conversation" do
      expect(json).not_to be_empty
      expect(json.size).to eq(1)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /conversations/:id" do
    before {get "/conversations/#{conversation_id}", params: {}, headers: authenticated_header(user) }

    context "when record exists" do
      it "return the conversation" do
        expect(json).not_to be_empty
        expect(json['id']).to eq(conversation_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "POST /conversations" do
    context "conversation is valid" do
      before {post "/conversations", params: {conversation: {name:"New convo"}}, headers: authenticated_header(user) }

      it "create conversation" do
        expect(json["name"]).to eq('New convo')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end
  end

  describe "PUT /conversations" do
    context "when the record exists" do
      before {get "/conversations/#{conversation_id}", params: {conversation: {name:"Hola Bonita"}}, headers: authenticated_header(user) }

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end


end
