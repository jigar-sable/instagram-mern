import { Dialog } from '@mui/material'
import UserListItem from './UserListItem'

const UsersDialog = ({ open, onClose, title, usersList }) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col w-72 sm:w-96">
        <div className="flex justify-between items-center px-4 border-b py-2">
          <span className="font-medium">{title}</span>
          <svg onClick={onClose} className="cursor-pointer" aria-label="Close" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
        </div>
        <div className="overflow-x-hidden h-96 w-full p-3">

          {usersList?.map((u) => (
            <UserListItem {...u} key={u._id} />
          ))}

        </div>
      </div>
    </Dialog>
  )
}

export default UsersDialog