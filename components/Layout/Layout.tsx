import React,{ ReactNode,  useEffect, useState } from 'react'
import Head from 'next/head';
import Footer from './Footer/Footer';
import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
import Header from './Header/Header';
import { pageNav } from '@/types/pageNav';
import Navbar from './Navbar/navbar';
import Sidebar from './Sidebar/Sidebar';

// const PUBLIC_PAGES = ["/"]; // 認証不要なページ

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession(); // statusを直接取得
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated" && !PUBLIC_PAGES.includes(router.pathname)) {
  //     router.push("/"); // 未ログインで公開ページ以外にアクセスした場合は初期ページへ
  //   }
  // }, [status, router]);

  if (status === "loading") {
    return <p className='mx-auto my-0'>Loading...</p>; // ローディング中の表示
  }

  console.log(session);

  return <>{children}</>; // ログイン済みの場合にコンテンツを表示
}
function SesstionProviderWraped({children} : {children: React.ReactNode}){
  return (
      <AuthGuard>
        {children}
      </AuthGuard>)
}

type LayoutProps={
  children: ReactNode;
  headerProps:{
    pageNavs:pageNav[];
    searchKeyWord?:string;
    allTags:string[];
  }
  sideNavProps?:{
    title:string;
    slug:string;
    childPages:pageNav[];
  }
}

const Layout:React.FC<LayoutProps> = ({ children,headerProps,sideNavProps })=> {
  const [isVisible, setIsVisible] = useState(true); // ヘッダーの表示状態
  const [lastScrollY, setLastScrollY] = useState(0); // 最後のスクロール位置
  const [openbar,setOpenbar]=useState(false);

    useEffect(() => {
      if(window!==undefined){
        const handleScroll = () => {
          
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // 下にスクロール: ヘッダーを非表示
                setIsVisible(false);
            } else {
                // 上にスクロール: ヘッダーを表示
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
      }
    }, [lastScrollY]);

  return (
    <div className='bg-white'>
        <Head>
          <title>Horizon Atlas</title>
        </Head>
        <Sidebar openbar={openbar} setOpenbar={setOpenbar} allTags={headerProps.allTags} pageNav={sideNavProps} />
        <div className='fixed top-0 z-50 w-full duration-500'  style={isVisible ? {transform: "translateY(0px)"} : {transform: "translateY(-65%)"}}>
          <Header searchKeyWord={headerProps.searchKeyWord} setOpenbar={setOpenbar} />
          <Navbar pageNavs={headerProps.pageNavs} />
        </div>
        <SesstionProviderWraped>
          {children}
        </SesstionProviderWraped>
        <Footer />
    </div>
  );
};

export default Layout