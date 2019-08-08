import React from 'react';
import Link from 'next/link';

const Post = (props: any) => {
    const { router } = props;

    return (
        <div>
            <div>post {router.query.id}</div>
            <ul>
                <li>
                    <Link href='/post/[id]/[comment]' as={`/post/${router.query.id}/first-comment`} prefetch={true}>
                        <a>First comment</a>
                    </Link>
                </li>
                <li>
                    <Link href='/post/[id]/[comment]' as={`/post/${router.query.id}/second-comment`} prefetch={true}>
                        <a>Second comment</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Post;
