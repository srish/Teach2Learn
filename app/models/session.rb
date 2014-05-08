class Session < ActiveRecord::Base
  belongs_to :user
  belongs_to :lesson
	has_many :session_attendances
  has_many :tutees, through: :session_attendances, source: :user

	def tutor
		user
	end

end
