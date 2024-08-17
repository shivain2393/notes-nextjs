"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { notFound } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@/hooks/useDebounce";

export default function Note({ params }) {
    const noteTitle = params.note_title;
    const [note, setNote] = useState({});
    const [error, setError] = useState(false);
    const [noteContent, setNoteContent] = useState("");
    const debouncedNoteContent = useDebounce(noteContent, 500);
    const { toast } = useToast();
    const textAreaRef = useRef(null);

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await axios.get(`/api/get-note?title=${noteTitle}`);
                if (response.status === 200) {
                    const fetchedNote = response.data.data;
                    setNote(fetchedNote);
                    setNoteContent(fetchedNote.content || ""); 
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            }
        };

        getNote();
    }, [noteTitle]);

    useEffect(() => {
        const updateNote = async () => {
            try {
                if (debouncedNoteContent !== note.content) {
                    const response = await axios.post('/api/update-note', { title: noteTitle, content: debouncedNoteContent });

                    if (response.status !== 200) {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem in saving your note.",
                            variant: "destructive"
                        });
                        return;
                    }

                    toast({
                        title: "Note saved successfully!",
                    });
                }
            } catch (error) {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem in saving your note.",
                    variant: "destructive"
                });
            }
        };

        if (debouncedNoteContent !== "") {
            updateNote();
        }
    }, [debouncedNoteContent]);

    useEffect(() => {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      }, []);

    if (error) {
        notFound();
    }

    return (
        <MaxWidthWrapper className={"mt-10"}>
            <Textarea
                ref={textAreaRef}
                onChange={(e) => setNoteContent(e.target.value)}
                value={noteContent}
                className="min-h-[50rem] hide-scrollbar resize-none"
                placeholder="your note . . ."
            />
        </MaxWidthWrapper>
    );
}
