import { EditorProps } from "react-draft-wysiwyg"
import dynamic from "next/dynamic"
import React, { Dispatch, SetStateAction } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import styled from "@emotion/styled"
import { EditorState } from "draft-js"
import Button from "./Buttons"

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  },
)

export default function CustomEditor({
  editorState,
  readOnly = false,
  onSave,
  onEditorStateChange,
}: {
  editorState: EditorState
  readOnly?: boolean
  onSave?: () => void
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
}) {
  console.log(readOnly)
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="editorToolbar-hidden"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbar={{
          options: ["inline", "list", "textAlign", "link"],
        }}
        localization={{
          local: "ko",
        }}
        onEditorStateChange={onEditorStateChange}
      />
      {!readOnly && <Button onClick={onSave}>Save</Button>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
`
