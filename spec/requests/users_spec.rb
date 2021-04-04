require 'rails_helper'

RSpec.describe "Users", type: :request do
  let!(:users) { create_list(:user,3)}
  let(:user_id) { users.first.id}
  describe "GET /index" do
    
    # pending "add some examples (or delete) #{__FILE__}"
  end
end
