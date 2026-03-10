import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { HospitalResources } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, Filter, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DashboardPage() {
  const [resources, setResources] = useState<HospitalResources[]>([]);
  const [filteredResources, setFilteredResources] = useState<HospitalResources[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [resources, searchQuery, filterType, filterStatus, filterLocation]);

  const loadResources = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<HospitalResources>('hospitalresources');
      setResources(result.items);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...resources];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (resource) =>
          resource.resourceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.specifications?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((resource) => resource.resourceType === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((resource) => resource.availabilityStatus === filterStatus);
    }

    // Location filter
    if (filterLocation !== 'all') {
      filtered = filtered.filter((resource) => resource.location === filterLocation);
    }

    setFilteredResources(filtered);
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'Available':
        return <CheckCircle className="w-5 h-5 text-accentcyan" />;
      case 'In Use':
        return <Clock className="w-5 h-5 text-secondary-foreground opacity-50" />;
      case 'Maintenance':
        return <AlertCircle className="w-5 h-5 text-secondary-foreground opacity-50" />;
      case 'Unavailable':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-secondary-foreground opacity-50" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Available':
        return 'bg-accentcyan bg-opacity-10 text-accentcyan';
      case 'In Use':
        return 'bg-secondary-foreground bg-opacity-10 text-secondary-foreground';
      case 'Maintenance':
        return 'bg-secondary-foreground bg-opacity-10 text-secondary-foreground';
      case 'Unavailable':
        return 'bg-destructive bg-opacity-10 text-destructive';
      default:
        return 'bg-secondary-foreground bg-opacity-10 text-secondary-foreground';
    }
  };

  const uniqueTypes = Array.from(new Set(resources.map((r) => r.resourceType).filter(Boolean)));
  const uniqueStatuses = Array.from(new Set(resources.map((r) => r.availabilityStatus).filter(Boolean)));
  const uniqueLocations = Array.from(new Set(resources.map((r) => r.location).filter(Boolean)));

  const stats = {
    total: resources.length,
    available: resources.filter((r) => r.availabilityStatus === 'Available').length,
    inUse: resources.filter((r) => r.availabilityStatus === 'In Use').length,
    unavailable: resources.filter((r) => r.availabilityStatus === 'Unavailable' || r.availabilityStatus === 'Maintenance').length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Dashboard Header */}
      <section className="w-full bg-primary py-16 px-8">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-4">
              Resource Dashboard
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground opacity-70">
              Real-time monitoring and management of hospital resources
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="w-full bg-secondary py-12 px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Resources', value: stats.total, color: 'secondary-foreground' },
              { label: 'Available', value: stats.available, color: 'accentcyan' },
              { label: 'In Use', value: stats.inUse, color: 'secondary-foreground' },
              { label: 'Unavailable', value: stats.unavailable, color: 'destructive' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-6 rounded-lg"
              >
                <p className="font-paragraph text-sm text-secondary-foreground opacity-70 mb-2">
                  {stat.label}
                </p>
                <p className={`font-heading text-4xl text-${stat.color}`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section id="resources" className="w-full bg-secondary py-8 px-8 border-b border-secondary-foreground border-opacity-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-foreground opacity-50" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 font-paragraph bg-background border-secondary-foreground border-opacity-20"
              />
            </div>

            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full lg:w-48 font-paragraph bg-background">
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type!}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full lg:w-48 font-paragraph bg-background">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status!}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-full lg:w-48 font-paragraph bg-background">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location!}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="w-full bg-secondary py-12 px-8 min-h-[60vh]">
        <div className="max-w-[100rem] mx-auto">
          {isLoading ? null : filteredResources.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/resource/${resource._id}`}>
                    <div className="bg-background p-6 rounded-lg hover:shadow-lg transition-shadow h-full border border-transparent hover:border-accentcyan">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                            {resource.resourceName}
                          </h3>
                          <p className="font-paragraph text-sm text-secondary-foreground opacity-70">
                            {resource.resourceType}
                          </p>
                        </div>
                        {getStatusIcon(resource.availabilityStatus)}
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="font-paragraph text-sm text-secondary-foreground opacity-70">
                            Location:
                          </span>
                          <span className="font-paragraph text-sm text-secondary-foreground">
                            {resource.location}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-paragraph text-sm text-secondary-foreground opacity-70">
                            Department:
                          </span>
                          <span className="font-paragraph text-sm text-secondary-foreground">
                            {resource.department}
                          </span>
                        </div>
                      </div>

                      <div className={`inline-block px-4 py-2 rounded-full font-paragraph text-sm ${getStatusColor(resource.availabilityStatus)}`}>
                        {resource.availabilityStatus}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-secondary-foreground opacity-30 mx-auto mb-4" />
              <p className="font-paragraph text-lg text-secondary-foreground opacity-70">
                No resources found matching your filters
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
