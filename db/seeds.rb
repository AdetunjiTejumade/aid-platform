# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User.create(
#     first_name: "John", last_name: "Snow", email:"john@snow.com", password:"password"
# )

# J = User.find(1)

# J.avatar.attach(
#     io: File.open('./public/avatar/Untitled.png'),
#     filename: 'Untitled.png',
#     content_type: 'application/png'
# )

Request.create(
    title:"Fan",
    description: "I need a fan",
    lat: 60.128162,
    lng: 18.643501,
    request_type: "material_need",
    address: "11 lala land,Earth",
    user_id: 2
)