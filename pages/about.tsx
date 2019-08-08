import React, { Component } from 'react';
import Link from 'next/link';

export default class extends Component<{}, {}> {
    render() {
        return (
            <ul>
                <li>
                    <Link href='/post/[id]' as='/post/1' prefetch={true}>
                        <a>Post 1</a>
                    </Link>
                </li>
                <li>
                    <Link href='/post/[id]' as='/post/2' prefetch={true}>
                        <a>Post 2</a>
                    </Link>
                </li>
            </ul>
        );
    }
}
