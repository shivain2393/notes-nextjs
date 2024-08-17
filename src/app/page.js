"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [title, setTitle] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const router = useRouter();

  const handleChange = (e) => {
    const input = e.target.value;
    if(input.trim() === ''){
      setDisableButton(true);
    }

    setDisableButton(false);
    setTitle(input);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDisableButton(true);

    try {

      const response = await axios.post('/api/create-note', { title });

      router.push(`/${response.data.data.title}`);

      setIsSubmitting(false);
      setDisableButton(false);

    } catch (error) {
      setIsSubmitting(false);
      setDisableButton(false);
    }

  }

  return (
    <MaxWidthWrapper className={"mt-28"}>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl gap-y-10">
        <div className="text-6xl leading-snug text-wrap font-bold tracking-tight text-muted-foreground sm:text-6xl">
          Welcome to <span className="text-blue-600">Quick Note</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:gap-2">
          <Input
            onChange={handleChange}
            className={"min-w-64"}
            placeholder={"Title of your note . . ."}
          />
          <Button type='submit' className={'min-w-36'} disabled={disableButton}>
            {isSubmitting ?
             <>
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
             Please Wait... 
             </>
             : "Go"}
          </Button>
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
