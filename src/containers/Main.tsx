import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { getFullName } from 'actions/simple';
import { Title, Button } from 'components';
import Link from 'next/link';

interface OwnProps {}
interface StateProps {
    name: string;
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type PropsComponent = OwnProps & StateProps & DispatchProps;
interface StateComponent {}

class Main extends Component<PropsComponent, StateComponent> {
    onButtonClicked = () => {
        this.props.getFullName();
    };

    render() {
        return (
            <>
                <Title className='mb-3'>Welcome to NextJS with Typescript</Title>
                <Button onClick={this.onButtonClicked}>View Name</Button>
                <Link href='/about'>
                    <a className='text-decoration-none text-primary'>About</a>
                </Link>
                <p>{this.props.name}</p>
            </>
        );
    }
}

const mapStateToProps = ({ name }: StateProps, ownProps: OwnProps) => ({ name, ...ownProps });

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getFullName }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
