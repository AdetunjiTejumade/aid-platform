class AddUserIdToRequests < ActiveRecord::Migration[6.0]
  def change
    add_reference :requests, :user, null: true, index: true
  end
end
