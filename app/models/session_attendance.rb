class SessionAttendance < ActiveRecord::Base
  belongs_to :session
  belongs_to :user
end
