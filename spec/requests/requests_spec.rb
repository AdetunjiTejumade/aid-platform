require 'rails_helper'

RSpec.describe "Requests", type: :request do
  # @user = User.new(first_name: "Jonh", last_name: "Snow",email:"test@gmail.com",password:"password" )
  # @user.save
  let!(:user) { create(:user)}
  let!(:requests) { create_list(:request,10, user_id: user.id)}
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
  describe "GET /requests/:id" do
    before {get "/requests/#{request_id}"}

    context "when record exists" do
      it "return the request" do
        expect(json).not_to be_empty
        expect(json['id']).to eq(request_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  # Test suite for POST /requests
  describe 'POST /requests' do    
    context "when the request is valid" do
      before { post '/requests', params: { request: {title:"Moving",description: "My exams are near and i havent paid my school fees",lat: 6.128162,lng: 3.643501,request_type: "material_need",address: "2, abule egba,lagos,nigeria",fulfilled: false, user_id:nil} } }

      it 'creates a request' do
        expect(json['title']).to eq('Moving')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/requests', params: { request: { title: 'School fee' }} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Description can't be blank/)
      end
    end

    describe 'PUT /requests/:id' do
      let(:valid_attributes) { { title: 'Shopping' } }
  
      context 'when the record exists' do
        before { put "/requests/#{request_id}", params: { request: { title: 'Shopping' }} }
  
        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end
      end
    end

    # describe 'DELETE /requests/:id' do
    #   before { delete "/requests/#{request_id}" }

    #   it 'returns status code 204' do
    #     expect(response).to have_http_status(204)
    #   end
    # end

  end
end
