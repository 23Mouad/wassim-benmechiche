"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Image {
    file: File;
    preview: string;
}

export default function NewProject() {
    const router = useRouter();
    const [project, setProject] = useState({
        title: "",
        description: "",
        github: "",
        playstore: "",
        backgroundColor: "#f5f5f5",
    });
    const [images, setImages] = useState<Image[]>([]);
    const [hasGithub, setHasGithub] = useState(false);
    const [hasPlaystore, setHasPlaystore] = useState(false);
    const [primaryImageIndex, setPrimaryImageIndex] = useState<number | null>(
        null
    );
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#f5f5f5");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setImages([...images, ...newImages]);
            if (primaryImageIndex === null && images.length === 0) {
                setPrimaryImageIndex(0);
            }
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        if (primaryImageIndex === index) {
            setPrimaryImageIndex(newImages.length > 0 ? 0 : null);
        } else if (primaryImageIndex !== null && primaryImageIndex > index) {
            setPrimaryImageIndex(primaryImageIndex - 1);
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && currentTag.trim()) {
            e.preventDefault();
            if (!tags.includes(currentTag.trim())) {
                setTags([...tags, currentTag.trim()]);
            }
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            toast({
                title: "Error",
                description: "Please add at least one image",
                variant: "destructive",
            });
            return;
        }
        if (primaryImageIndex === null) {
            toast({
                title: "Error",
                description: "Please select a primary image",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("title", project.title);
        formData.append("description", project.description);
        if (hasGithub) formData.append("github", project.github);
        if (hasPlaystore) formData.append("playstore", project.playstore);
        formData.append("backgroundColor", backgroundColor);
        formData.append("tags", JSON.stringify(tags));
        formData.append("primaryImageIndex", primaryImageIndex.toString());

        images.forEach((image) => {
            formData.append("images", image.file);
        });

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error("Failed to create project");

            toast({
                title: "Success",
                description: "Project created successfully",
            });
            router.push("/admin/projects");
        } catch (error) {
            console.error("Error creating project:", error);
            toast({
                title: "Error",
                description: "Failed to create project",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                    Add New Project
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <Input
                            name="title"
                            value={project.title}
                            onChange={handleChange}
                            placeholder="Project Title"
                            required
                        />
                        <Textarea
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            placeholder="Project Description"
                            required
                        />
                    </div>

                    {/* Tags Input */}
                    <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="hover:text-destructive"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <Input
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            placeholder="Type a tag and press Enter"
                        />
                    </div>

                    {/* Color Picker */}
                    <div className="space-y-2">
                        <Label>Background Color</Label>
                        <Input
                            type="color"
                            value={backgroundColor}
                            onChange={handleColorChange}
                            className="h-10 w-20"
                        />
                    </div>

                    {/* Images */}
                    <div className="space-y-4">
                        <Label>Images (Max 6)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <Image
                                            src={
                                                image.preview ||
                                                "/placeholder.svg"
                                            }
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <RadioGroup
                                            value={primaryImageIndex?.toString()}
                                            onValueChange={(value) =>
                                                setPrimaryImageIndex(
                                                    Number.parseInt(value)
                                                )
                                            }
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value={index.toString()}
                                                    id={`primary-${index}`}
                                                    className="bg-white"
                                                />
                                                <Label
                                                    htmlFor={`primary-${index}`}
                                                    className="text-white"
                                                >
                                                    Primary
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {images.length < 6 && (
                                <div className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center">
                                    <Input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer h-[300px]"
                                        multiple
                                    />
                                    <Plus className="h-6 w-6 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="github-switch"
                                checked={hasGithub}
                                onCheckedChange={setHasGithub}
                            />
                            <Label htmlFor="github-switch">
                                Has GitHub Link
                            </Label>
                        </div>
                        {hasGithub && (
                            <Input
                                name="github"
                                value={project.github}
                                onChange={handleChange}
                                placeholder="GitHub URL"
                            />
                        )}

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="playstore-switch"
                                checked={hasPlaystore}
                                onCheckedChange={setHasPlaystore}
                            />
                            <Label htmlFor="playstore-switch">
                                Has Play Store Link
                            </Label>
                        </div>
                        {hasPlaystore && (
                            <Input
                                name="playstore"
                                value={project.playstore}
                                onChange={handleChange}
                                placeholder="Play Store URL"
                            />
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/admin/projects")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Project"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
