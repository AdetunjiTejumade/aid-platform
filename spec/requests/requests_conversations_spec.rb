require 'rails_helper'

RSpec.describe "RequestsConversations", type: :request do
  let!(:conversation) {create(:conversation)}
  describe "GET /index" do
    before {get '/conversations', params: {}, headers: authenticated_header(user)}

    it "returns conversation" do
      expect(json).not_to be_empty
      expect(json.size).to eq(1)
    end
  end
end
