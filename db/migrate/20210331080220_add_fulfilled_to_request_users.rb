class AddFulfilledToRequestUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :requests_users, :fulfilled, :boolean, default:false
  end
end
