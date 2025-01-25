import Layout from "@/components/Layout/Layout";
import SingleCourse from "@/components/Post/SingleCourse";
import { BASIC_NAV, HOME_NAV } from "@/constants/pageNavs";
import {  getAllPosts, getAllTags, getEitherCourses, getPostsByCourse } from "@/lib/services/notionApiService";
import { PostMetaData } from "@/types/postMetaData";
import type { GetStaticProps,} from "next";

type Props={
    courseAndPosts: {
        course: string;
        posts: PostMetaData[];
    }[];
    allTags:string[];
}

// getStaticProps関数
export const getStaticProps: GetStaticProps = async () => {
    const allPosts = await getAllPosts();
    const allTags = await getAllTags(allPosts);
    const basicCourse = await getEitherCourses(true,allPosts);
    const courseAndPosts = await Promise.all(basicCourse.map(async(course)=>{
        const posts = await getPostsByCourse(course,allPosts);
        return {
            course,
            posts
        }
    }))

    return {
        props: {
            courseAndPosts,
            allTags
        },
        revalidate: 600
    };
};

const blogTagPageList = ({courseAndPosts,allTags }: Props)=> {
    return (
        <Layout headerProps={{pageNavs:[HOME_NAV,BASIC_NAV],allTags}}>
            <div className="container h-full w-full mx-auto font-mono pt-20">
                <main className="container w-full mt-16 mb-3">
                    <h1 className="text-5xl font-medium text-center mb-16">基礎班カリキュラム</h1>
                    <section className="gap-3 mx-auto">
                        {courseAndPosts.map((courseAndPosts,i)=>
                            <SingleCourse course={courseAndPosts.course} posts={courseAndPosts.posts} key={i} />
                        )}
                    </section>
                </main>
            </div>
        </Layout>
        
    );
}

export default blogTagPageList;