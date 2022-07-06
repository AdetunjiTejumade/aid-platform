require 'rails_helper'

RSpec.describe "Messages", type: :request do
  # current_user = User.first_or_create!(email:'tejumade@gmail.com', password: 'password', first_name:"tejumade", last_name:"Adetunji")
  let!(:user) {create(:user)}
  let!(:conversation) {create(:conversation)}
  let!(:message) {create(:message, user_id: user.id, conversation_id: conversation.id)}
  let!(:message_id) {message.id}
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: {sub:user.id}).token
    { 'Authorization': "Bearer #{token}"}
  end

  # before do
  #   signin(user)
  # end
  let(:valid_atributes) do 
    {
      'id' => 1
    }
  end
  describe "GET /messages" do
    # message = Message.create
    before { get "/messages", params: {}, headers: authenticated_header(user) }
    
    it "returns messages" do
      expect(json).not_to be_empty
      expect(json.size).to eq(1)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /messages/:id" do
    before {get "/messages/#{message_id}", params: {}, headers: authenticated_header(user) }

    context "when record exists" do
      it "return the message" do
        expect(json).not_to be_empty
        expect(json['id']).to eq(message_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "POST /messages" do
    context "message is valid" do
      before {post "/messages", params: {message: {body:"Wasssup", user_id:nil, conversation_id: conversation.id}}, headers: authenticated_header(user) }

      it "create message" do
        expect(json["body"]).to eq('Wasssup')
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "PUT /messages" do
    context "when the record exists" do
      before {get "/messages/#{message_id}", params: {message: {body:"I'm good"}}, headers: authenticated_header(user) }

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /messages/:id' do
    before {delete "/messages/#{message_id}", params: {}, headers: authenticated_header(user) }

    it "return status code 204" do
      expect(response).to have_http_status(204)
    end
  end

end
