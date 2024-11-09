import Link from 'next/link';
import { useSession } from 'next-auth/react';

function MainNavigation() {

  const { data: session } = useSession();
  const isAdmin = session?.user?.isAdmin;

  return (
    <header className='bg-gradient-to-r from-black to-gray-700 h-24 relative'>
      <div className='flex justify-between items-center h-full absolute inset-0'>

        <div className='left-12 font-semibold text-neutral-400 text-5xl'>
          Car Rental
        </div>
      </div>

      <nav className='absolute right-12 top-1/2 transform -translate-y-1/2'>
        <ul className='flex space-x-8 text-neutral-400'>
          <li>
            <Link href='/'>All Cars</Link>
          </li>
          { isAdmin 
              ? <li><Link href='/orders'>Orders</Link></li> 
              : null
          }
          {
            session 
            ? (<li>
                {isAdmin ? <Link href='/new-car'>Add new car</Link> : <Link href='/new-rent'>New rent</Link>}
              </li>) 
            : (<li>
                <Link href='/auth/register'>Register</Link>
              </li>)
          }
          {session
            ? (<li>
                {isAdmin ? <Link href='/admin'>Admin</Link> : <Link href='/profile'>Profile</Link>}
              </li>)
            : (<li>
                <Link href='/auth/login'>Sign In</Link>
              </li>)
          }
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;