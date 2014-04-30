class Session < ActiveRecord::Base
  belongs_to :user
  belongs_to :lesson
#  has_many :tutees, through: :session_attendance, source: :user
end
