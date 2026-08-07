"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles, Clock, SlidersHorizontal, BookOpen } from "lucide-react";
import { GlossaryTerm } from "@/app/lib/glossary";

type GlossaryClientListProps = {
  terms: GlossaryTerm[];
};

const CATEGORIES = [
  "All",
  "Text Formatting",
  "SEO",
  "QR Codes",
  "PDF",
  "AI Writing",
  "Programming",
];

const ITEMS_PER_PAGE = 24;

export default function GlossaryClientList({ terms }: GlossaryClientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"a-z" | "z-a" | "latest">("a-z");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filter and search terms
  const filteredTerms = useMemo(() => {
    let result = [...terms];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(
        (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.term.toLowerCase().includes(query) ||
          t.shortDefinition.toLowerCase().includes(query) ||
          t.definition.toLowerCase().includes(query) ||
          t.aliases.some((alias) => alias.toLowerCase().includes(query)) ||
          (t.keywords && t.keywords.some((kw) => kw.toLowerCase().includes(query)))
      );
    }

    // Sort terms
    if (sortBy === "a-z") {
      result.sort((a, b) => a.term.localeCompare(b.term));
    } else if (sortBy === "z-a") {
      result.sort((a, b) => b.term.localeCompare(a.term));
    } else if (sortBy === "latest") {
      result.sort((a, b) => {
        const dateA = new Date(a.updatedAt || "2026-01-01").getTime();
        const dateB = new Date(b.updatedAt || "2026-01-01").getTime();
        return dateB - dateA;
      });
    }

    return result;
  }, [terms, searchQuery, selectedCategory, sortBy]);

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  // 2. Identify Featured Term (e.g. the first matched item if search/filter applied,
  // or a key term like "sentence-case" by default)
  const featuredTerm = useMemo(() => {
    if (searchQuery || selectedCategory !== "All") {
      return filteredTerms[0] || null;
    }
    // Default featured item
    return terms.find((t) => t.slug === "sentence-case") || terms[0] || null;
  }, [terms, filteredTerms, searchQuery, selectedCategory]);

  const showFeaturedSection = !searchQuery && selectedCategory === "All";

  // Remove featured term from the list of standard grid cards so it is not duplicated
  const listTerms = useMemo(() => {
    if (!featuredTerm || !showFeaturedSection) return filteredTerms;
    return filteredTerms.filter((t) => t.slug !== featuredTerm.slug);
  }, [filteredTerms, featuredTerm, showFeaturedSection]);

  // 3. Identify Latest Terms (top 4 latest updated, excluding the featured one)
  const latestTerms = useMemo(() => {
    const sorted = [...terms]
      .filter((t) => !featuredTerm || t.slug !== featuredTerm.slug)
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt || "2026-01-01").getTime();
        const dateB = new Date(b.updatedAt || "2026-01-01").getTime();
        return dateB - dateA;
      });
    return sorted.slice(0, 4);
  }, [terms, featuredTerm]);

  // 4. Pagination
  const totalPages = Math.ceil(listTerms.length / ITEMS_PER_PAGE);
  const paginatedTerms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return listTerms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [listTerms, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of list
    const element = document.getElementById("glossary-list-start");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12">
      {/* Header Info */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-xs font-semibold text-purple-700">
          <BookOpen className="size-3.5" />
          <span>Productivity Glossary</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 bg-clip-text">
          TechMind Knowledge Hub
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          Unlock clear, detailed explanations for text formatting, SEO optimization, QR codes,
          PDF operations, AI writing models, and modern programming terms.
        </p>
      </div>

      {/* Hero: Featured & Latest Grid */}
      {featuredTerm && !searchQuery && selectedCategory === "All" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured Card */}
          <div className="lg:col-span-2 rounded-3xl border border-purple-200 bg-gradient-to-br from-white via-white to-purple-50/50 p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl -mr-8 -mt-8" />
            <div className="space-y-4 relative">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white shadow-xs">
                  <Sparkles className="size-3" />
                  Featured Term
                </span>
                <span className="text-xs font-semibold text-purple-700 bg-purple-100/60 px-3 py-1 rounded-full">
                  {featuredTerm.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                <Link href={`/glossary/${featuredTerm.slug}`}>
                  {featuredTerm.term}
                </Link>
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {featuredTerm.definition}
              </p>
              {featuredTerm.useCases && featuredTerm.useCases.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Common Applications
                  </span>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {featuredTerm.useCases.slice(0, 2).map((uc, i) => (
                      <li key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2 rounded-lg">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0" />
                        <span className="truncate">{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-purple-100/60 mt-6">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="size-3.5" />
                Updated {featuredTerm.updatedAt}
              </span>
              <Link
                href={`/glossary/${featuredTerm.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors"
              >
                <span>Read Full Entry</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Latest Sidebar */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="size-4 text-purple-600" />
                Latest Glossary
              </h3>
              <div className="divide-y divide-slate-100">
                {latestTerms.map((term) => (
                  <article key={term.slug} className="py-3.5 first:pt-0 last:pb-0 group">
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {term.category}
                    </span>
                    <h4 className="font-semibold text-slate-900 mt-1.5 text-sm group-hover:text-purple-700 transition-colors">
                      <Link href={`/glossary/${term.slug}`}>{term.term}</Link>
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                      {term.shortDefinition}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 text-center">
              <span className="text-xs text-slate-400">Real-time developer & SEO updates</span>
            </div>
          </div>
        </div>
      )}

      {/* Control Panel: Search & Filters */}
      <div id="glossary-list-start" className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="size-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search glossary by term, keyword, definition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0 w-full md:w-auto justify-end">
            <SlidersHorizontal className="size-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm font-semibold border border-slate-200 rounded-xl px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer"
            >
              <option value="a-z">Alphabetical (A-Z)</option>
              <option value="z-a">Alphabetical (Z-A)</option>
              <option value="latest">Recently Updated</option>
            </select>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-4">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-purple-700 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Results */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">
            {filteredTerms.length} {filteredTerms.length === 1 ? "term" : "terms"}{" "}
            {selectedCategory !== "All" && `in ${selectedCategory}`}
          </h3>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-semibold text-purple-700 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {paginatedTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTerms.map((term) => (
              <article
                key={term.slug}
                className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-purple-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
                      {term.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{term.updatedAt}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    <Link href={`/glossary/${term.slug}`}>{term.term}</Link>
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {term.shortDefinition}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  {term.aliases && term.aliases.length > 0 ? (
                    <span className="text-xs text-slate-400 italic truncate max-w-[65%]">
                      Alias: {term.aliases[0]}
                    </span>
                  ) : (
                    <span />
                  )}
                  <Link
                    href={`/glossary/${term.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900"
                  >
                    <span>Explore</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-3xl space-y-3">
            <p className="text-slate-500 text-sm">No glossary terms matched your query.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Reset search criteria
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2 border-t border-slate-100 pt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isActive = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`size-8 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? "bg-purple-700 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
