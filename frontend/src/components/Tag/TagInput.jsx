import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, theme } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

const TagInput = (props) => {
    const { tags, setTags } = props;

    const { token } = theme.useToken();
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        var _a;
        if (inputVisible) {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [inputVisible]);

    const handleClose = removedTag => {
        const newTags = tags.filter(tag => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = tag => (
        <span key={tag} style={{ display: 'inline-block' }}>
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        </span>
    );

    const tagChild = tags.map(forMap);
    const tagPlusStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    return (
        <>
            {tags?.length > 0 &&
                <div style={{ marginBottom: 12 }}>
                    <TweenOneGroup
                        appear={false}
                        enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        onEnd={e => {
                            if (e.type === 'appear' || e.type === 'enter') {
                                e.target.style = 'display: inline-block';
                            }
                        }}
                    >
                        <div className='flex flex-wrap gap-y-2'>
                            {tagChild}
                        </div>
                    </TweenOneGroup>
                </div>
            }

            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag onClick={() => setInputVisible(true)} style={tagPlusStyle}>
                    <PlusOutlined /> New Tag
                </Tag>
            )}
        </>
    );
}

export default TagInput