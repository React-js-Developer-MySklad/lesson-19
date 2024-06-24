import {render, screen} from "@testing-library/react";
import {ErrorBoundary} from "./ErrorBoundary";
import '@testing-library/jest-dom'
import React, {useEffect, useState} from "react";

const HasErrorInComponentFunction = () => {
    throw new Error('Error In Body');
}

const HasErrorOnUnmount = () => {
    useEffect(() => {
        return () => {
            throw new Error('Error On Unmount')
        }

    }, []);

    return 'Content';
}

const HasErrorOnMount = () => {
    useEffect(() => {
        throw new Error('Error On Mount')
    }, []);
    return 'Content'
}

const HasErrorOnRerender = () => {
    const [state, setState] = useState<boolean>(false)

    useEffect(() => {
        if (state) {
            throw new Error('Error On Rerender')
        }

    }, [state]);

    useEffect(() => {
        const timeoutId = setTimeout(() => setState(true), 1000);
        return () => clearTimeout(timeoutId)
    }, []);

    return 'Content'
}


describe('ErrorBoundary', () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it('should catch error in body component', async () => {
        render(<ErrorBoundary><HasErrorInComponentFunction/></ErrorBoundary>)
        expect(await screen.findByText('Error In Body', {exact: false}, {timeout: 1200})).toBeInTheDocument()
    })

    it('should catch error on mount', async () => {
        render(<ErrorBoundary><HasErrorOnMount/></ErrorBoundary>)
        expect(await screen.findByText('Error On Mount', {exact: false})).toBeInTheDocument()
    })

    it('should catch error on unmount', async () => {
        const Component: React.FC<{isRendered: boolean}> = ({isRendered}) => {
            return <ErrorBoundary>{isRendered && <HasErrorOnUnmount/>}</ErrorBoundary>
        }

        const {rerender}= render(<Component isRendered={true}/>)
        expect(await screen.findByText('Content')).toBeInTheDocument()

        rerender(<Component isRendered={false}/>)
        expect(await screen.findByText('Error On Unmount', {exact: false})).toBeInTheDocument()
    })

    it('should catch error on rerender', async () => {
        render(<ErrorBoundary><HasErrorOnRerender/></ErrorBoundary>)
        expect(await screen.findByText('Error On Rerender', {exact: false}, {timeout: 1200})).toBeInTheDocument()
    })
})