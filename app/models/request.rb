class Request < ApplicationRecord

    REQUEST_TYPES = {
        one_time_task: 'one_time_task',
        material_need: 'material_need'
      }

    validates :title, presence: true, length: { maximum: 80 }
    validates :description, presence: true, length: { minimum: 2, maximum: 300 }
    validates :lat, presence: true
    validates :lng, presence: true
    validates_inclusion_of :request_type, in: [REQUEST_TYPES[:one_time_task], REQUEST_TYPES[:material_need]]
 

    
    has_and_belongs_to_many :users

    has_and_belongs_to_many :conversations, dependent: :destroy
end
